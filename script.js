// TODO ...

/* FAV example command: ffmpeg
    -v level+warning -stats
    -threads 4 -filter_complex_threads 6
    -hwaccel cuda -hwaccel_output_format cuda -i v1.mp4
    -hwaccel cuda -hwaccel_output_format cuda -i v2.mp4
    -i th.png
    -i sub_eng.srt
    -i sub_ger.srt
    -i ffmetadata_chapters.txt
    -filter_complex "
        [0:v] trim= 0:20, setpts=PTS-STARTPTS[i0v0];
        [0:a]atrim= 0:20,asetpts=PTS-STARTPTS[i0a0];
        [0:v] trim=14:60, setpts=PTS-STARTPTS[i0v1];
        [0:a]atrim=14:60,asetpts=PTS-STARTPTS[i0a1];
        [1:v] trim= 1:20, setpts=PTS-STARTPTS[i1v0];
        [1:a]atrim= 1:20,asetpts=PTS-STARTPTS[i1a0];
        [1:v] trim=16:40, setpts=PTS-STARTPTS[i1v1];
        [1:a]atrim=16:40,asetpts=PTS-STARTPTS[i1a1];
        [i0v0][i0a0]
        [i0v1][i0a1]
        [i1v0][i1a0]
        [i1v1][i1a1]
        concat=n=4:v=1:a=1
        [cv][ca]
    " -map "[cv]" -c:v:0 h264_nvenc
        -preset p7 -tune hq -profile:v:0 high -level:v:0 auto -rc vbr
        -b:v:0 4M -minrate:v:0 500k -maxrate:v:0 8M -bufsize:v:0 8M
        -multipass disabled -fps_mode passthrough -b_ref_mode:v:0 disabled
        -rc-lookahead:v:0 32 -qp 4
    -map 2 -c:v:1 png -disposition:v:1 attached_pic
    -map "[ca]" -c:a aac
    -map 3 -c:s mov_text -metadata:s:0 language=eng
    -map 4 -c:s mov_text -metadata:s:1 language=ger
    -map_chapters 5
    -metadata title="VIDEO TITLE"
    -metadata comment="VIDEO DESCRIPTION"
    -metadata artist=MAZ01001
    out.mp4

    FAV generate srt subtitle file (sub_LNG.srt ~ "data:,URI-encoded%20text%0Ahere")
    1
    00:00:00,000 --> 00:00:03,000
    hello there

    3
    00:00:3,000 --> 00:01:00,000
    multi
    line
    subtitles

    FAV generate metadata file with chapters (ffmetadata_chapters.txt ~ download "data:,URI-encoded%20text%0Ahere")
    ;FFMETADATA1
    # escape = ; # \ and newline with \
    title=VIDEO TITLE
    comment=VIDEO\
    DESCRIPTION
    artist=MAZ01001

    [CHAPTER]
    # set base to milliseconds
    TIMEBASE=1/1000
    START=0
    END=1000
    title=chapter \#1
    # ...

    FAV also note https://ffmpeg.org/ffmpeg-all.html#Quoting-and-escaping

    TODO add filter: crop=WIDTH:HEIGHT:POSX:POSY
    > add red box (CSS) to visualize final area ~ pan/zoom-able area with video elements at final size and position (CSS)
    TODO add filter: scale=WIDTH:HEIGHT:flags=FLAG[:param0=VALUE] / scale_cuda=WIDTH:HEIGHT:interp_algo=ALGO
    > [flags]
    >> fast_bilinear: Select fast bilinear scaling algorithm.
    >> bilinear: Select bilinear scaling algorithm.
    >> bicubic: Select bicubic scaling algorithm. (default)
    >> experimental: Select experimental scaling algorithm.
    >> neighbor: Select nearest neighbor rescaling algorithm.
    >> area: Select averaging area rescaling algorithm.
    >> bicublin: Select bicubic scaling algorithm for the luma component, bilinear for chroma components.
    >> gauss: Select Gaussian rescaling algorithm.
    >> sinc: Select sinc rescaling algorithm.
    >> lanczos: Select Lanczos rescaling algorithm. The default width (alpha) is 3 and can be changed by setting param0.
    >> spline: Select natural bicubic spline rescaling algorithm.
    >> accurate_rnd: Enable accurate rounding.
    >> full_chroma_int: Enable full chroma interpolation.
    >> full_chroma_inp: Select full chroma input.
    >> bitexact: Enable bitexact output.
    > [interp_algo]
    >> nearest: Nearest neighbour - Used by default if input parameters match the desired output.
    >> bilinear: Bilinear
    >> bicubic: Bicubic - This is the default.
    >> lanczos: Lanczos
    TODO add filter: pad=WIDTH:HEIGHT:X:Y[:[0x|#]RRGGBB[AA]] (X/Y -1 to center ~ top/left)
    > MP4 does not support transparency
*/
