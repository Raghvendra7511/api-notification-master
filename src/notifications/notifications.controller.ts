// src/notifications/notifications.controller.ts

import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a notification' })
  async sendNotification(@Body() notificationDto: any) {
    return this.notificationsService.sendNotification(notificationDto);
  }

  @Get(':userId/logs')
  @ApiOperation({ summary: 'Get notification logs for a user' })
  async getUserLogs(@Param('userId') userId: string) {
    return this.notificationsService.getUserLogs(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get notification statistics' })
  async getStats() {
    return this.notificationsService.getStats();
  }
}