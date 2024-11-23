// src/notifications/notifications.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './schemas/notification-log.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(notificationDto: any) {
    const notification = new this.notificationLogModel({
      ...notificationDto,
      status: 'pending',
      sentAt: new Date(),
    });
    
    try {
      // Simulate sending notification
      await new Promise(resolve => setTimeout(resolve, 1000));
      notification.status = 'sent';
    } catch (error) {
      notification.status = 'failed';
      notification.failureReason = error.message;
    }

    return notification.save();
  }

  async getUserLogs(userId: string) {
    return this.notificationLogModel.find({ userId }).exec();
  }

  async getStats() {
    return this.notificationLogModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
  }
}