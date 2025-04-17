import { FFmpegKit } from 'ffmpeg-kit-react-native';

export async function cropVideo(inputPath: string, start: number, duration: number, outputPath: string) {
  const cmd = `-ss ${start} -i "\${inputPath}" -t \${duration} -c copy "\${outputPath}"`;
  await FFmpegKit.execute(cmd);
}
