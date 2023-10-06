// Path: src/stakeholders/user/dto/user-content.dto.ts
// DESC: user content dto
'use strict';

// import { google } from 'google-proto-files'; // Assuming you have the google-proto-files package installed

// // Create a utility function to convert Date to google.protobuf.Timestamp
// function dateToTimestamp(date: Date): google.protobuf.Timestamp {
//   const timestamp = new google.protobuf.Timestamp();
//   timestamp.fromDate(date);
//   return timestamp;
// }

// // Create a utility function to convert google.protobuf.Timestamp to Date
// function timestampToDate(timestamp: google.protobuf.Timestamp): Date {
//   return timestamp.toDate();
// }

// // Example of converting from Date to google.protobuf.Timestamp when creating a CommonDateDTO
// const createdAt: Date = new Date();
// const updatedAt: Date = new Date();

// const commonDateDTO = new CommonDateDTO(
//   dateToTimestamp(createdAt),
//   'john.doe',
//   dateToTimestamp(updatedAt),
//   'jane.smith'
// );

// // Example of converting from google.protobuf.Timestamp to Date when reading from a CommonDate object
// const commonDate: CommonDate = /* ... */; // Get a CommonDate object from your data source

// const createdDate: Date = timestampToDate(commonDate.createdAt);
// const updatedDate: Date = timestampToDate(commonDate.updatedAt);
// // Continue working with createdDate and updatedDate as Date objects in your application
