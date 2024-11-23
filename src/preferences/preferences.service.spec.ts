import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreferencesService } from '../preferences/preferences.service';
import { UserPreference } from '../preferences/schemas/user-preference.schema';
import { NotFoundException } from '@nestjs/common';

describe('PreferencesService', () => {
  let service: PreferencesService;
  let model: Model<UserPreference>;

  const mockUserPreference = {
    userId: 'test123',
    email: 'test@example.com',
    preferences: {
      marketing: true,
      newsletter: true,
      updates: true,
      frequency: 'daily',
      channels: {
        email: true,
        sms: false,
        push: true
      }
    },
    timezone: 'UTC'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: {
            findOne: jest.fn(),
            new: jest.fn(),
            save: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken(UserPreference.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user preference', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUserPreference),
      } as any);

      const result = await service.findOne('test123');
      expect(result).toEqual(mockUserPreference);
    });

    it('should throw NotFoundException when user preference not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });
});