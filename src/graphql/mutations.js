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
      samePokerCnt
      sameValueCnt
      sameColorCnt
      differentCnt
      balance
      highestBalance
      gameRecords
      isEntryPaid
      language
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
      samePokerCnt
      sameValueCnt
      sameColorCnt
      differentCnt
      balance
      highestBalance
      gameRecords
      isEntryPaid
      language
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
      samePokerCnt
      sameValueCnt
      sameColorCnt
      differentCnt
      balance
      highestBalance
      gameRecords
      isEntryPaid
      language
      owner
    }
  }
`;
