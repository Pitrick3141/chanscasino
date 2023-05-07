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
      balance
      highestBalance
      gameRecords {
        items {
          id
          username
          createdAt
          randomPoker
          selectedPoker
          gameResult
          gamePrize
          balance
          updatedAt
          owner
        }
        nextToken
      }
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
      balance
      highestBalance
      gameRecords {
        items {
          id
          username
          createdAt
          randomPoker
          selectedPoker
          gameResult
          gamePrize
          balance
          updatedAt
          owner
        }
        nextToken
      }
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
      balance
      highestBalance
      gameRecords {
        items {
          id
          username
          createdAt
          randomPoker
          selectedPoker
          gameResult
          gamePrize
          balance
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreateGameRecord = /* GraphQL */ `
  subscription OnCreateGameRecord(
    $filter: ModelSubscriptionGameRecordFilterInput
    $owner: String
  ) {
    onCreateGameRecord(filter: $filter, owner: $owner) {
      id
      username
      createdAt
      randomPoker
      selectedPoker
      gameResult
      gamePrize
      balance
      updatedAt
      owner
    }
  }
`;
export const onUpdateGameRecord = /* GraphQL */ `
  subscription OnUpdateGameRecord(
    $filter: ModelSubscriptionGameRecordFilterInput
    $owner: String
  ) {
    onUpdateGameRecord(filter: $filter, owner: $owner) {
      id
      username
      createdAt
      randomPoker
      selectedPoker
      gameResult
      gamePrize
      balance
      updatedAt
      owner
    }
  }
`;
export const onDeleteGameRecord = /* GraphQL */ `
  subscription OnDeleteGameRecord(
    $filter: ModelSubscriptionGameRecordFilterInput
    $owner: String
  ) {
    onDeleteGameRecord(filter: $filter, owner: $owner) {
      id
      username
      createdAt
      randomPoker
      selectedPoker
      gameResult
      gamePrize
      balance
      updatedAt
      owner
    }
  }
`;
