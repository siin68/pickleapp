import prisma from "../../prisma";

export const chatQueries = {
  async getUserChats(userId: string) {
    const userIdNum = parseInt(userId, 10);
    return prisma.chatParticipant.findMany({
      where: { userId: userIdNum },
      include: {
        chat: {
          include: {
            event: {
              select: { title: true, date: true },
            },
            participants: {
              where: { userId: { not: userIdNum } },
              include: {
                user: { select: { name: true, image: true } },
              },
            },
            messages: {
              orderBy: { timestamp: "desc" },
              take: 1,
              include: {
                sender: { select: { name: true, image: true } },
              },
            },
          },
        },
      },
      orderBy: {
        chat: {
          updatedAt: "desc",
        },
      },
    });
  },

  // Get chat messages
  //   async getChatMessages(chatId: string, userId: string, limit: number = 50) {
  //     const participant = await prisma.chatParticipant.findUnique({
  //       where: {
  //         chatId_userId: { chatId, userId: senderId },
  //       },
  //     });

  //     if (!participant) return null;

  //     return prisma.message.findMany({
  //       where: { chatId },
  //       include: {
  //         sender: { select: { id: true, name: true, image: true } },
  //         replyTo: {
  //           include: {
  //             sender: { select: { name: true } },
  //           },
  //         },
  //       },
  //       orderBy: { timestamp: "desc" },
  //       take: limit,
  //     });
  //   },

  // Create new chat
  async createChat(
    participants: string[],
    eventId?: string,
    type: string = "GROUP"
  ) {
    const chat = await prisma.chat.create({
      data: {
        eventId: eventId ? parseInt(eventId, 10) : null,
        type,
        participants: {
          create: participants.map((participantId, index) => ({
            userId: parseInt(participantId, 10),
            role: index === 0 ? "OWNER" : "MEMBER",
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: { select: { name: true, image: true } },
          },
        },
      },
    });

    return chat;
  },

  //   async sendMessage(
  //     chatId: string,
  //     senderId: string,
  //     content: string,
  //     replyToId?: string
  //   ) {
  //     const participant = await prisma.chatParticipant.findUnique({
  //       where: {
  //         chatId_userId: { chatId, senderId },
  //       },
  //     });

  //     if (!participant) throw new Error("User is not a participant in this chat");

  //     const message = await prisma.message.create({
  //       data: {
  //         chatId,
  //         senderId,
  //         content,
  //         replyToId,
  //       },
  //       include: {
  //         sender: { select: { id: true, name: true, image: true } },
  //         replyTo: {
  //           include: {
  //             sender: { select: { name: true } },
  //           },
  //         },
  //       },
  //     });

  //     // Update chat's updatedAt
  //     await prisma.chat.update({
  //       where: { id: chatId },
  //       data: { updatedAt: new Date() },
  //     });

  //     return message;
  //   },

  // Mark messages as read
  async markAsRead(chatId: string, userId: string) {
    const chatIdNum = parseInt(chatId, 10);
    const userIdNum = parseInt(userId, 10);
    return prisma.chatParticipant.update({
      where: {
        chatId_userId: { chatId: chatIdNum, userId: userIdNum },
      },
      data: {
        lastReadAt: new Date(),
      },
    });
  },
};
