import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { QueryListingsDto } from './dto/query-listings.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, sellerId: string, sellerType: any) {
    return this.prisma.listing.create({
      data: {
        ...createListingDto,
        features: createListingDto.features ? JSON.stringify(createListingDto.features) : null,
        images: createListingDto.images ? JSON.stringify(createListingDto.images) : null,
        sellerId,
        sellerType,
      },
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            sellerType: true,
          },
        },
      },
    });
  }

  async findAll(query: QueryListingsDto) {
    const {
      search,
      brand,
      model,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      bodyType,
      fuelType,
      transmission,
      condition,
      driveType,
      owner,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = query;

    const where: Prisma.ListingWhereInput = {
      isActive: true,
      // status: 'APPROVED', // Temporarily remove for testing
    };

    // Search in title and description
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Filters
    if (brand) where.brand = { equals: brand };
    if (model) where.model = { equals: model };
    if (bodyType) where.bodyType = { equals: bodyType };
    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;
    if (condition) where.condition = condition;
    if (driveType) where.driveType = driveType;
    if (owner) where.owner = owner;

    // Range filters
    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year.gte = minYear;
      if (maxYear) where.year.lte = maxYear;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }

    if (minMileage || maxMileage) {
      where.mileage = {};
      if (minMileage) where.mileage.gte = minMileage;
      if (maxMileage) where.mileage.lte = maxMileage;
    }

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        include: {
          seller: {
            select: {
              id: true,
              email: true,
              sellerType: true,
            },
          },
          _count: {
            select: { leads: true },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.listing.count({ where }),
    ]);

    // Parse JSON strings back to arrays
    const processedListings = listings.map(listing => ({
      ...listing,
      features: listing.features ? JSON.parse(listing.features) : [],
      images: listing.images ? JSON.parse(listing.images) : [],
    }));

    return {
      listings: processedListings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            sellerType: true,
          },
        },
        leads: {
          include: {
            buyer: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: { leads: true },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Parse JSON strings back to arrays
    return {
      ...listing,
      features: listing.features ? JSON.parse(listing.features) : [],
      images: listing.images ? JSON.parse(listing.images) : [],
    };
  }

  async update(id: string, updateListingDto: UpdateListingDto, userId: string, userRole: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Only seller can update their own listing, or admin
    if (listing.sellerId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own listings');
    }

    // Prepare data for update, stringify arrays if present
    const updateData: any = { ...updateListingDto };
    if (updateData.features) {
      updateData.features = JSON.stringify(updateData.features);
    }
    if (updateData.images) {
      updateData.images = JSON.stringify(updateData.images);
    }

    return this.prisma.listing.update({
      where: { id },
      data: updateData,
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            sellerType: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, userRole: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Only seller can delete their own listing, or admin
    if (listing.sellerId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own listings');
    }

    return this.prisma.listing.delete({
      where: { id },
    });
  }

  async getMyListings(sellerId: string, query: QueryListingsDto) {
    const {
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = query;

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where: { sellerId },
        include: {
          _count: {
            select: { leads: true },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.listing.count({ where: { sellerId } }),
    ]);

    // Parse JSON strings back to arrays
    const processedListings = listings.map(listing => ({
      ...listing,
      features: listing.features ? JSON.parse(listing.features) : [],
      images: listing.images ? JSON.parse(listing.images) : [],
    }));

    return {
      listings: processedListings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async approveListing(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return this.prisma.listing.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }

  async rejectListing(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return this.prisma.listing.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }
}