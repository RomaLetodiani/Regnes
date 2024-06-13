import { LoggerService } from '@nestjs/common';

export class EmojiLogger implements LoggerService {
  log(message: string) {
    this.writeToFile(`📢 ${message}`);
  }

  error(message: string, trace: string) {
    this.writeToFile(`❌ message: ${message}\n🔍 Stack Trace: ${trace}`);
  }

  warn(message: string) {
    this.writeToFile(`⚠️ ${message}`);
  }

  debug(message: string) {
    this.writeToFile(`🐞 ${message}`);
  }

  private writeToFile(message: string) {
    // FIXME: Implement the logic to write logs to a file or database.
    // For demonstration purposes, I'll just log to the console.
    console.log(message, '\n📅 Date: ', new Date().toString(), '\n');
  }
}
