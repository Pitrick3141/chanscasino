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
      nextToken
    }
  }
`;
export const getGameRecord = /* GraphQL */ `
  query GetGameRecord($id: ID!) {
    getGameRecord(id: $id) {
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
export const listGameRecords = /* GraphQL */ `
  query ListGameRecords(
    $filter: ModelGameRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
