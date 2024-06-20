declare module 'react-player' {
    import { Component, CSSProperties } from 'react';

    interface ReactPlayerProps {
        url: string;
        playing?: boolean;
        loop?: boolean;
        controls?: boolean;
        volume?: number;
        muted?: boolean;
        playbackRate?: number;
        width?: string | number;
        height?: string | number;
        style?: CSSProperties;
        progressInterval?: number;
        playsinline?: boolean;
        pip?: boolean;
        stopOnUnmount?: boolean;
        light?: boolean | string;
        playIcon?: React.ReactElement;
        previewTabIndex?: number;
        fallback?: React.ReactElement;
        wrapper?: string | React.ComponentType;
        config?: {
            youtube?: object;
            facebook?: object;
            dailymotion?: object;
            vimeo?: object;
            file?: object;
            wistia?: object;
            mixcloud?: object;
            twitch?: object;
            soundcloud?: object;
            streamable?: object;
            vidyard?: object;
            kaltura?: object;
        };
        onReady?: (player: any) => void;
        onStart?: () => void;
        onPlay?: () => void;
        onEnablePIP?: () => void;
        onDisablePIP?: () => void;
        onPause?: () => void;
        onBuffer?: () => void;
        onBufferEnd?: () => void;
        onSeek?: (seconds: number) => void;
        onEnded?: () => void;
        onError?: (error: any) => void;
        onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
        onDuration?: (duration: number) => void;
    }

    export default class ReactPlayer extends Component<ReactPlayerProps> {}
}
