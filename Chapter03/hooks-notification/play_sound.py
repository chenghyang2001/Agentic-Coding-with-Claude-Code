import pygame
import os
import sys
import datetime
from pathlib import Path

def main():
    # Initialize pygame mixer
    pygame.mixer.init()

    # 使用絕對路徑找 wav，避免 hook 執行時 CWD 不同導致找不到
    sound_file = str(Path(__file__).parent / (sys.argv[1] if len(sys.argv) > 1 else "ding.wav"))
    if not os.path.exists(sound_file):
        print(f"Error: {sound_file} not found in current directory")
        return
    
    try:
        # Load and play the sound
        sound = pygame.mixer.Sound(sound_file)
        sound.play()
        
        # Wait for the sound to finish playing
        while pygame.mixer.get_busy():
            pygame.time.wait(100)
            
        print(f"Played {sound_file}")

        # 記錄每次 hook 觸發音效播放，方便日後審查哪個事件觸發最頻繁
        log_path = Path(__file__).parent / "hook-events.log"
        try:
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            sound_basename = os.path.basename(sound_file)
            with open(log_path, "a", encoding="utf-8") as log_file:
                log_file.write(f"{timestamp} | {sound_basename}\n")
        except OSError as log_err:
            # log 寫入失敗不中斷音效流程，僅印出警告
            print(f"Warning: 無法寫入 log：{log_err}")

    except pygame.error as e:
        print(f"Error playing sound: {e}")
    finally:
        pygame.mixer.quit()


if __name__ == "__main__":
    main()
