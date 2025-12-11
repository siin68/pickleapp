import prisma from "../../prisma";

/**
 * Social features queries
 */
export const socialQueries = {
  // Get friend suggestions
  async getFriendSuggestions(userId: string, limit: number = 10) {
    const userIdNum = parseInt(userId, 10);
    const user = await prisma.user.findUnique({
      where: { id: userIdNum },
      include: { hobbies: true, locations: true },
    });

    if (!user) return [];

    const userHobbyIds = user.hobbies.map((h) => h.hobbyId);

    return prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userIdNum } },
          { isActive: true },
          {
            hobbies: {
              some: { hobbyId: { in: userHobbyIds } },
            },
          },
          {
            NOT: {
              OR: [
                { friendships1: { some: { user2Id: userIdNum } } },
                { friendships2: { some: { user1Id: userIdNum } } },
                { sentFriendRequests: { some: { receiverId: userIdNum } } },
                { receivedFriendRequests: { some: { senderId: userIdNum } } },
              ],
            },
          },
        ],
      },
      include: {
        hobbies: { include: { hobby: true } },
        receivedReviews: {
          select: { rating: true },
        },
      },
      take: limit,
    });
  },

  // Get user's friends
  async getUserFriends(userId: string) {
    const userIdNum = parseInt(userId, 10);
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: userIdNum }, { user2Id: userIdNum }],
      },
      include: {
        user1: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            lastActive: true,
          },
        },
        user2: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            lastActive: true,
          },
        },
      },
    });

    return friendships.map((friendship) =>
      friendship.user1Id === userIdNum ? friendship.user2 : friendship.user1
    );
  },

  // Send friend request
  async sendFriendRequest(
    senderId: string,
    receiverId: string,
    message?: string
  ) {
    const senderIdNum = parseInt(senderId, 10);
    const receiverIdNum = parseInt(receiverId, 10);
    // Check if already friends or request exists
    const existingRelation = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: senderIdNum, receiverId: receiverIdNum },
          { senderId: receiverIdNum, receiverId: senderIdNum },
        ],
      },
    });

    if (existingRelation) {
      throw new Error(
        "Friend request already exists or users are already friends"
      );
    }

    return prisma.friendRequest.create({
      data: {
        senderId: senderIdNum,
        receiverId: receiverIdNum,
        message,
      },
      include: {
        sender: { select: { name: true, image: true } },
        receiver: { select: { name: true, image: true } },
      },
    });
  },

  // Accept friend request
  async acceptFriendRequest(requestId: string) {
    const requestIdNum = parseInt(requestId, 10);
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestIdNum },
    });

    if (!request || request.status !== "PENDING") {
      throw new Error("Invalid friend request");
    }

    // Create friendship
    await prisma.friendship.create({
      data: {
        user1Id: request.senderId,
        user2Id: request.receiverId,
      },
    });

    // Update request status
    return prisma.friendRequest.update({
      where: { id: requestIdNum },
      data: {
        status: "ACCEPTED",
        respondedAt: new Date(),
      },
    });
  },

  // Get pending friend requests
  async getPendingFriendRequests(userId: string) {
    const userIdNum = parseInt(userId, 10);
    return prisma.friendRequest.findMany({
      where: {
        receiverId: userIdNum,
        status: "PENDING",
      },
      include: {
        sender: { select: { id: true, name: true, image: true, bio: true } },
      },
      orderBy: { sentAt: "desc" },
    });
  },
};
