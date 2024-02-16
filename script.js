// TODO ...

/* FAV example command: ffmpeg
    -v level+warning -stats
    -threads 4 -filter_complex_threads 6
    -hwaccel cuda -hwaccel_output_format cuda -i v1.mp4
    -hwaccel cuda -hwaccel_output_format cuda -i v2.mp4
    -i th.png
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
    -metadata comment="VIDEO DESCRIPTION"
    -metadata title="VIDEO TITLE"
    -metadata artist="MAZ01001"
    out.mp4
*/
