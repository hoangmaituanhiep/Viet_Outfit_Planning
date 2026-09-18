package service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import payload.gemini.GeminiPayload;

public class GeminiService {
  private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);
  
  @Value("${google.ai.api-key}")
  private String apiKey;

  @Value("${google.ai.model}")
  private String modelName;

  private final HttpClient httpClient = HttpClient.newHttpClient();
  private final ObjectMapper objectMapper;

  public GeminiService(ObjectMapper objectMapper) {this.objectMapper=objectMapper;}
  public String generateString(String userInput) {
    try {
      String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s", modelName, apiKey);

      String systemPrompt = "Cần tạo promt sao cho con gemini flash trả lời mỗi tên hay id của trang phục thôi";

      GeminiPayload payload = new GeminiPayload(systemPrompt, userInput);
      String jsonPayload = objectMapper.writeValueAsString(payload);
      HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
        .build();
      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
      if (response.statusCode() == 200) {
        return response.body();
      }
      else {
        logger.warn("WARNING: {}. Message: {}", response.statusCode(), response.body());
        return "API Error: " + response.statusCode();
      }
    }
    catch(Exception e) {
      logger.error("ERROR: {}", e.getMessage());
      return "Server Error";
    }
  }
}
