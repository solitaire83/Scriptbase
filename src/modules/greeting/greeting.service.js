export class GreetingService {
  async CeFaci(answer) {
    const lista = {
      "Bine": "Ma bucur!",
      "Foarte bine": "Excelent, continua tot asa!",
      "Exceptional": "Wow, asta e fantastic!",
    };

    return lista[answer];
  }
}

export const greetingService = new GreetingService();
