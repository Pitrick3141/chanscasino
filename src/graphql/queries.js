/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
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
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
