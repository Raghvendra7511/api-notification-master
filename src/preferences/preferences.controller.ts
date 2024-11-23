import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@ApiTags('preferences')
@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  @ApiOperation({ summary: 'Create user preferences' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Preferences created successfully',
    type: CreatePreferenceDto 
  })
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user preferences' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Preferences retrieved successfully',
    type: CreatePreferenceDto
  })
  findOne(@Param('userId') userId: string) {
    return this.preferencesService.findOne(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Preferences updated successfully',
    type: CreatePreferenceDto
  })
  update(@Param('userId') userId: string, @Body() updateData: Partial<CreatePreferenceDto>) {
    return this.preferencesService.update(userId, updateData);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user preferences' })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'Preferences deleted successfully' 
  })
  remove(@Param('userId') userId: string) {
    return this.preferencesService.remove(userId);
  }
}