import type { Server as NetServer, Socket } from "node:net";
import type { NextApiResponse } from "next";
import type { Server as SocketIOServer } from "socket.io";
import type { Server, Profile, Member } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
