import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { QueryListingsDto } from './dto/query-listings.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

interface RequestWithUser extends Request {
  user: {
    id: string;
    role: string;
    sellerType: string;
  };
}

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  create(@Body() createListingDto: CreateListingDto, @Request() req: RequestWithUser) {
    return this.listingsService.create(
      createListingDto,
      req.user.id,
      req.user.sellerType,
    );
  }

  @Get()
  findAll(@Query() query: QueryListingsDto) {
    return this.listingsService.findAll(query);
  }

  @Get('my-listings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  getMyListings(@Query() query: QueryListingsDto, @Request() req: RequestWithUser) {
    return this.listingsService.getMyListings(req.user.id, query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.listingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateListingDto: UpdateListingDto,
    @Request() req: RequestWithUser,
  ) {
    return this.listingsService.update(id, updateListingDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req: RequestWithUser) {
    return this.listingsService.remove(id, req.user.id, req.user.role);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  approve(@Param('id', ParseUUIDPipe) id: string) {
    return this.listingsService.approveListing(id);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  reject(@Param('id', ParseUUIDPipe) id: string) {
    return this.listingsService.rejectListing(id);
  }
}