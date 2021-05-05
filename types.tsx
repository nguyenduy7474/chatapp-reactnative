/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Persons: undefined;
  Groups: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: string;
  name: string;
  imageUri: string;
}

export type Message = {
  id: string;
  content: string;
  createAt: number;
  user: User
}

export type ChatRoom = {
  id: string;
  users: User;
  lastMessage: Message;
}

export type Userid = {
  userid: string
}
