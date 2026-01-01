import { useEffect, useRef } from "react";
import videojs from "video.js";
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src, aspectRatio = "16:9", playsInline = true }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const getVideoType = (url) => {
        if (!url) return "";

        // Check for HLS
        if (url.includes(".m3u8") || url.includes("hls")) {
            return "application/x-mpegURL";
        }

        // Check for data URL - let browser detect
        if (url.startsWith("data:")) {
            return "";
        }

        // Check file extension for regular videos
        if (url.includes(".mp4")) return "video/mp4";
        if (url.includes(".webm")) return "video/webm";
        if (url.includes(".ogg")) return "video/ogg";

        // Default: let browser detect
        return "";
    };

    useEffect(() => {
        if (!playerRef.current && videoRef.current) {
            const player = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
                aspectRatio: aspectRatio,
                html5: {
                    vhs: {
                        overrideNative: true,
                    },
                },
            });

            playerRef.current = player;

            if (src) {
                const type = getVideoType(src);
                player.src(type ? { src, type } : { src });
            }
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (playerRef.current && src) {
            const type = getVideoType(src);
            playerRef.current.src(type ? { src, type } : { src });
        }
    }, [src]);

    return (
        <div data-vjs-player className="w-full rounded-md overflow-hidden">
            <video ref={videoRef} className="video-js vjs-big-play-centered" playsInline={playsInline} />
        </div>
    );
};

export default VideoPlayer;
