import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  bookingData: Array<Record<string, any>> = [{
    Id: 1,
    GuestName: `Steve Smith`,
    CheckIn:'2024-09-29T12:56:55.769Z',
    CheckOut: '2024-09-30T12:56:55.769Z',
    IsAllDay: false,
    Floor: 1,
    Room: 1,
    Nights: 1,
    Adults: 2,
    Child: 1,
    Purpose: 'Vacation',
    ContactNumber: '',
    Email: '',
    Price: 500,
    Proof: '',
    ProofNumber: '',
    EndTimezone: null,
    RecurrenceException: null,
    RecurrenceID: null,
    RecurrenceRule: null,
    StartTimezone: null,
  }]
  floorData: Array<Record<string, any>> = [
    { text: 'Ground Floor', id: 1, color: '#cb6bb2' },
    { text: 'First Floor', id: 2, color: '#56ca85' },
    { text: 'Second Floor', id: 3, color: '#df5286' },
    { text: 'Third Floor', id: 4, color: '#df5286' },
    { text: 'Fourth Floor', id: 5, color: '#df5286' },
  ];
  amenities: Array<Record<string, any>> = [
    { id: 1, name: 'Television' },
    { id: 2, name: 'Projector' },
    { id: 3, name: 'Balcony' },
    { id: 4, name: 'Whiteboard' },
    { id: 5, name: 'Kitchen' },
    { id: 6, name: 'Internet' },
    ];


  roomData: Array<Record<string, any>> = [
    {
      text: 'Alpha Room',
      id: 1,
      groupId: 1,
      color: '#FDF4FF',
      price: 500,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
        { id: 6, name: 'Internet' },
      ],
    },
    {
      text: 'Beta Room',
      id: 2,
      groupId: 1,
      color: '#F0FDF4',
      price: 400,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
      ],
    },
    {
      text: 'Delta Room',
      id: 3,
      groupId: 1,
      color: '#ECE7FF',
      price: 250,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
      ],
    },
    {
      text: 'Gamma Room',
      id: 4,
      groupId: 1,
      color: '#ECFEFF',
      price: 150,
      amenities: [{ id: 1, name: 'Television' }],
    },
    {
      text: 'Teta Room',
      id: 5,
      groupId: 2,
      color: '#FDF2F8',
      price: 500,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
        { id: 6, name: 'Internet' },
      ],
    },
    {
      text: 'Zeta Room',
      id: 6,
      groupId: 2,
      color: '#FFF7ED',
      price: 400,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
      ],
    },
    {
      text: 'Alpha Room',
      id: 7,
      groupId: 2,
      color: '#FDF4FF',
      price: 250,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
      ],
    },
    {
      text: 'Beta Room',
      id: 8,
      groupId: 2,
      color: '#ECFEFF',
      price: 150,
      amenities: [{ id: 1, name: 'Television' }],
    },
    {
      text: 'Alpha Room',
      id: 9,
      groupId: 3,
      color: '#FDF4FF',
      price: 500,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
        { id: 6, name: 'Internet' },
      ],
    },
    {
      text: 'Beta Room',
      id: 10,
      groupId: 3,
      color: '#F0FDF4',
      price: 400,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
      ],
    },
    {
      text: 'Delta Room',
      id: 11,
      groupId: 3,
      color: '#ECE7FF',
      price: 250,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
      ],
    },
    {
      text: 'Gamma Room',
      id: 12,
      groupId: 3,
      color: '#ECFEFF',
      price: 150,
      amenities: [{ id: 1, name: 'Television' }],
    },
    {
      text: 'Teta Room',
      id: 13,
      groupId: 4,
      color: '#FDF2F8',
      price: 500,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
        { id: 6, name: 'Internet' },
      ],
    },
    {
      text: 'Zeta Room',
      id: 14,
      groupId: 4,
      color: '#FFF7ED',
      price: 400,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
      ],
    },
    {
      text: 'Alpha Room',
      id: 15,
      groupId: 4,
      color: '#FDF4FF',
      price: 250,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
      ],
    },
    {
      text: 'Beta Room',
      id: 16,
      groupId: 4,
      color: '#ECFEFF',
      price: 150,
      amenities: [{ id: 1, name: 'Television' }],
    },
    {
      text: 'Alpha Room',
      id: 17,
      groupId: 5,
      color: '#FDF4FF',
      price: 500,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
        { id: 6, name: 'Internet' },
      ],
    },
    {
      text: 'Beta Room',
      id: 18,
      groupId: 5,
      color: '#F0FDF4',
      price: 400,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
        { id: 4, name: 'Whiteboard' },
        { id: 5, name: 'Kitchen' },
      ],
    },
    {
      text: 'Delta Room',
      id: 19,
      groupId: 5,
      color: '#ECE7FF',
      price: 250,
      amenities: [
        { id: 1, name: 'Television' },
        { id: 2, name: 'Projector' },
        { id: 3, name: 'Balcony' },
      ],
    },
    {
      text: 'Gamma Room',
      id: 20,
      groupId: 5,
      color: '#ECFEFF',
      price: 150,
      amenities: [{ id: 1, name: 'Television' }],
    },
  ];


  emittedData = new BehaviorSubject<boolean>(false);
  filterData = new BehaviorSubject<{floorId:[],priceId:[],featuresId:[]}>({
    floorId: [],
    priceId: [],
    featuresId: [],
  });
  showSchedule: boolean = true;

  constructor() { }
}
