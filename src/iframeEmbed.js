// Utilities to improve iframe embedding behavior (auto-resize + scroll enabling)
(function(){
  if (typeof window === 'undefined') return;

  const isInIframe = window.self !== window.top;
  if (!isInIframe) return;

  document.body.classList.add('embed-mode');

  // Post size to parent
  const postSize = () => {
    const height = document.documentElement.scrollHeight;
    const width = document.documentElement.scrollWidth;
    window.parent.postMessage({ type: 'EMBED_RESIZE', height, width }, '*');
  };

  let resizeObserver;
  try {
    resizeObserver = new ResizeObserver(() => {
      postSize();
    });
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
  } catch (e) {
    // Fallback interval if ResizeObserver unsupported
    setInterval(postSize, 1000);
  }

  // Initial post after load & small delay for fonts
  window.addEventListener('load', () => {
    setTimeout(postSize, 300);
  });
  setTimeout(postSize, 100); // early attempt

  // Listen for parent requests
  window.addEventListener('message', (ev) => {
    const data = ev.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'EMBED_REQUEST_SIZE') {
      postSize();
    }
  });
})();
