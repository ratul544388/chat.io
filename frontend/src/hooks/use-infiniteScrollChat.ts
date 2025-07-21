import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;
const delay = () => new Promise((res) => setTimeout(res, 1000));
const data = Array.from({ length: 105 }).map((_, i) => `Message ${105 - i}`);

export function useInfiniteScrollChat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLSpanElement>(null); // ✅ Added here

  const [messages, setMessages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isFirstRender = useRef(true);
  const hasFetchedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
      isFirstRender.current = false;
    });
  }, []);

  useEffect(() => {
    const loadInitialMessages = async () => {
      await delay();
      const initialMessages = data.slice(-PAGE_SIZE);
      setMessages(initialMessages);
      setIsInitialLoading(false);
      scrollToBottom();
    };
    loadInitialMessages();
  }, [scrollToBottom]);

  const fetchMore = useCallback(async () => {
    if (isFetchingNextPage || isInitialLoading || !hasMore) return;

    const container = containerRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    setIsFetchingNextPage(true);
    hasFetchedRef.current = true;

    await delay();

    const nextStart = data.length - (page + 1) * PAGE_SIZE;
    const nextEnd = data.length - page * PAGE_SIZE;

    const newMessages =
      nextStart >= 0 ? data.slice(nextStart, nextEnd) : data.slice(0, nextEnd);

    setMessages((prev) => [...newMessages, ...prev]);
    setPage((prev) => prev + 1);

    if ((page + 1) * PAGE_SIZE >= data.length) {
      setHasMore(false);
    }

    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (container) {
        const newScrollHeight = container.scrollHeight;
        const scrollDelta = newScrollHeight - prevScrollHeight;
        container.scrollTop += scrollDelta;
      }
      hasFetchedRef.current = false;
      setIsFetchingNextPage(false);
    });
  }, [isFetchingNextPage, isInitialLoading, hasMore, page]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop < 200 &&
        !isFirstRender.current &&
        !hasFetchedRef.current
      ) {
        fetchMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchMore]);

  return {
    containerRef,
    topRef, // ✅ Add to return object
    messages,
    isInitialLoading,
    isFetchingNextPage,
    hasMore,
  };
}
