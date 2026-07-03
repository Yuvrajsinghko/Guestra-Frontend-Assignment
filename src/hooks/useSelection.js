import { useState, useCallback, useRef } from 'react';

export function useSelection() {
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCurrent, setDragCurrent] = useState(null);
  const dragStartRef = useRef(null);

  const handleMouseDown = useCallback((date) => {
    dragStartRef.current = date;
    setIsDragging(true);
    setDragCurrent(date);
    setSelectionStart(null);
    setSelectionEnd(null);
  }, []);

  const handleMouseEnter = useCallback(
    (date) => {
      if (!isDragging) return;
      setDragCurrent(date);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !dragStartRef.current) {
      setIsDragging(false);
      return;
    }

    const start = dragStartRef.current;
    const end = dragCurrent;

    // Normalize: always start <= end
    if (start <= end) {
      setSelectionStart(start);
      setSelectionEnd(end);
    } else {
      setSelectionStart(end);
      setSelectionEnd(start);
    }

    setIsDragging(false);
    setDragCurrent(null);
    dragStartRef.current = null;
  }, [isDragging, dragCurrent]);

  const clearSelection = useCallback(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
  }, []);

  // The active range for highlighting during drag or after selection
  const activeStart = isDragging
    ? dragStartRef.current && dragCurrent
      ? (dragStartRef.current <= dragCurrent ? dragStartRef.current : dragCurrent)
      : null
    : selectionStart;

  const activeEnd = isDragging
    ? dragStartRef.current && dragCurrent
      ? (dragStartRef.current <= dragCurrent ? dragCurrent : dragStartRef.current)
      : null
    : selectionEnd;

  return {
    selectionStart,
    selectionEnd,
    isDragging,
    activeStart,
    activeEnd,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    clearSelection,
  };
}
