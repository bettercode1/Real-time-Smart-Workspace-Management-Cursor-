// Mock Firebase provider for demo mode
export const mockAuth = {
  currentUser: { uid: "mock-user", email: "user@demo.com", displayName: "Demo User", role: "user" },
  signInWithGoogle: async () => ({ user: { uid: "mock-user", email: "user@demo.com", displayName: "Demo User", role: "user" } }),
  signOut: async () => {},
};

export const mockDb = {
  // Add mock Firestore-like methods as needed
};

export const mockStorage = {
  // Add mock Storage-like methods as needed
}; 