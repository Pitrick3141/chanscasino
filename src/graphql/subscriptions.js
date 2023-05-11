/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo(
    $filter: ModelSubscriptionUserInfoFilterInput
    $owner: String
  ) {
    onCreateUserInfo(filter: $filter, owner: $owner) {
      id
      username
      createdAt
      updatedAt
      gamePlayed
      samePokerCnt
      sameValueCnt
      sameColorCnt
      differentCnt
      balance
      highestBalance
      gameRecords
      isEntryPaid
      owner
    }
  }
`;
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo(
    $filter: ModelSubscriptionUserInfoFilterInput
    $owner: String
  ) {
    onUpdateUserInfo(filter: $filter, owner: $owner) {
      id
      username
      createdAt
      updatedAt
      gamePlayed
      samePokerCnt
      sameValueCnt
      sameColorCnt
      differentCnt
      balance
      highestBalance
      gameRecords
      isEntryPaid
      owner
    }
  }
`;
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo(
    $filter: ModelSubscriptionUserInfoFilterInput
    $owner: String
  ) {
    onDeleteUserInfo(filter: $filter, owner: $owner) {
      id
      username
      createdAt
      updatedAt
      gamePlayed
      samePokerCnt
      sameValueCnt
      sameColorCnt
      differentCnt
      balance
      highestBalance
      gameRecords
      isEntryPaid
      owner
    }
  }
`;
