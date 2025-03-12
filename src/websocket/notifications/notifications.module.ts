import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Module({})
export class NotificationsModule {
    providers: [NotificationsGateway]
}
