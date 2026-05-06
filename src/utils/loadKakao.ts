let isKakaoLoaded = false;

export const loadKakaoScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isKakaoLoaded || window.kakao) {
      return resolve();
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        isKakaoLoaded = true;
        resolve();
      });
    };

    document.head.appendChild(script);
  });
};
