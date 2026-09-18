package controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DTO.GeminiRequest;
import service.GeminiService;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {
  private static final Logger logger = LoggerFactory.getLogger(GeminiController.class);

  private final GeminiService geminiService;

  public GeminiController(GeminiService geminiService) {this.geminiService = geminiService;}

  @PostMapping("/generate")
  public ResponseEntity<String> generateGeminiResponse(@RequestBody GeminiRequest request) {
    logger.info("INFO: Calling Gemini");
    if (request.getPrompt()==null || request.getPrompt().trim().isEmpty()) {
      logger.warn("WARNING: Empty Prompt");
      return ResponseEntity.badRequest().body("Need to fill the inputs");
    }
    String result = geminiService.generateString(request.getPrompt());

    logger.info("INFO: Completing Backend AI process");
    return ResponseEntity.ok(result);
  }
}
