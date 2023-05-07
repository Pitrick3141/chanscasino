/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
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
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
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
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
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
export const createGameRecord = /* GraphQL */ `
  mutation CreateGameRecord(
    $input: CreateGameRecordInput!
    $condition: ModelGameRecordConditionInput
  ) {
    createGameRecord(input: $input, condition: $condition) {
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
export const updateGameRecord = /* GraphQL */ `
  mutation UpdateGameRecord(
    $input: UpdateGameRecordInput!
    $condition: ModelGameRecordConditionInput
  ) {
    updateGameRecord(input: $input, condition: $condition) {
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
export const deleteGameRecord = /* GraphQL */ `
  mutation DeleteGameRecord(
    $input: DeleteGameRecordInput!
    $condition: ModelGameRecordConditionInput
  ) {
    deleteGameRecord(input: $input, condition: $condition) {
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
