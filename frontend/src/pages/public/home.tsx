import { useInfiniteScrollChat } from "@/hooks/use-infiniteScrollChat";

const Home = () => {
  const {
    containerRef,
    topRef,
    messages,
    isInitialLoading,
    isFetchingNextPage,
    hasMore,
  } = useInfiniteScrollChat();

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div
        ref={containerRef}
        className="flex-1 flex flex-col overflow-y-auto px-4 py-2 gap-2"
      >
        {/* Element to observe scrolling near the top */}
        <span ref={topRef} />

        {/* Show initial loading indicator */}
        {isInitialLoading && (
          <p className="text-center text-sm text-gray-500">Loading chat...</p>
        )}

        {/* Only show once initial loading is done */}
        {!isInitialLoading && (
          <>
            {/* Top loading message when fetching more */}
            {isFetchingNextPage && (
              <p className="text-center text-sm text-gray-400">
                Loading more...
              </p>
            )}

            {/* Shown only when there are no more messages */}
            {!hasMore && (
              <p className="text-center text-sm text-gray-400">
                No more messages
              </p>
            )}

            {/* Render all messages */}
            {messages.map((msg) => (
              <div key={msg} className="bg-gray-200 rounded px-2 py-1">
                {msg}
              </div>
            ))}
          </>
        )}
      </div>
      <ChatInput />
    </div>
  );
};

export default Home;

// These components remain untouched as per your request
const ChatHeader = () => (
  <div className="h-12 border-b bg-white shadow-sm sticky top-0 flex items-center px-4">
    Chat Header
  </div>
);

const ChatInput = () => (
  <div className="h-12 border-t bg-white shadow-sm flex items-center px-4">
    Chat Input
  </div>
);
