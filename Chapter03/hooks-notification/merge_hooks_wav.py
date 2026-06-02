"""合併 Chapter03 Hook 通知音效的所有 WAV 檔為單一檔案。

使用 Python 內建 wave 模組，依照 Hook 事件觸發順序合併，
方便一次試聽所有音效、確認完整性。
"""
import sys
import wave
from pathlib import Path

# 合併順序：依照 Hook 事件對應，英文版在前、繁中版在後
WAV_ORDER = [
    "UserPromptSubmit.wav",
    "提交Prompt時.wav",
    "PreToolUse.wav",
    "工具使用前.wav",
    "PostToolUse.wav",
    "工具使用後.wav",
    "Stop.wav",
    "回應結束時.wav",
    "Notification.wav",
    "系統通知時.wav",
    "PreCompact.wav",
    "壓縮Context前.wav",
]

BASE_DIR = Path(__file__).parent
OUTPUT = BASE_DIR / "ch03_all_hooks_combined.wav"


def merge_wav_files(file_paths: list[Path], output_path: Path) -> int:
    """合併多個 WAV 檔到單一輸出檔，回傳合併後總 frames 數。

    為什麼用 wave 內建模組而非 pydub：
    所有音效已確認格式相同（mono / 22050 Hz / 16-bit），
    直接串接 raw frames 不需解碼/重編碼，速度快且無外部依賴。

    Args:
        file_paths: 依序排列的 WAV 檔絕對路徑清單
        output_path: 輸出 WAV 檔的絕對路徑

    Returns:
        合併後的總 frames 數

    Raises:
        FileNotFoundError: 任一輸入檔不存在
        ValueError: 任一輸入檔格式（channels/framerate/sampwidth）與第一個不符
    """
    # 驗證所有檔案存在
    for fp in file_paths:
        if not fp.exists():
            raise FileNotFoundError(f"WAV 檔不存在：{fp}")

    # 讀取第一個檔案，取得基準格式參數
    with wave.open(str(file_paths[0]), "rb") as ref_wav:
        ref_params = ref_wav.getparams()
        ref_channels = ref_wav.getnchannels()
        ref_framerate = ref_wav.getframerate()
        ref_sampwidth = ref_wav.getsampwidth()

    total_frames = 0

    with wave.open(str(output_path), "wb") as out_wav:
        out_wav.setparams(ref_params)

        for fp in file_paths:
            with wave.open(str(fp), "rb") as src_wav:
                # 驗證格式相容性（不符即明確報錯，避免輸出破損音訊）
                if src_wav.getnchannels() != ref_channels:
                    raise ValueError(
                        f"channels 不符：{fp.name} 為 {src_wav.getnchannels()}，"
                        f"期望 {ref_channels}"
                    )
                if src_wav.getframerate() != ref_framerate:
                    raise ValueError(
                        f"framerate 不符：{fp.name} 為 {src_wav.getframerate()} Hz，"
                        f"期望 {ref_framerate} Hz"
                    )
                if src_wav.getsampwidth() != ref_sampwidth:
                    raise ValueError(
                        f"sampwidth 不符：{fp.name} 為 {src_wav.getsampwidth()} bytes，"
                        f"期望 {ref_sampwidth} bytes"
                    )

                frames = src_wav.readframes(src_wav.getnframes())
                out_wav.writeframes(frames)
                n = src_wav.getnframes()
                total_frames += n
                print(f"  已加入：{fp.name}（{n} frames）")

    return total_frames


def main() -> None:
    try:
        file_paths = [BASE_DIR / name for name in WAV_ORDER]

        print(f"合併 {len(WAV_ORDER)} 個 WAV 檔...")
        total = merge_wav_files(file_paths, OUTPUT)

        print(f"\n完成！")
        print(f"  輸出路徑：{OUTPUT}")
        print(f"  總 frames：{total}")
        duration_sec = total / 22050
        print(f"  總時長約：{duration_sec:.2f} 秒")

    except (FileNotFoundError, ValueError) as e:
        print(f"錯誤：{e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"未預期錯誤：{e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
