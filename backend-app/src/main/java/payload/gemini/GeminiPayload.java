package payload.gemini;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GeminiPayload {
  @JsonProperty("system_instruction")
  private SystemInstruction systemInstruction;
  private List<Content> contents;

  public GeminiPayload() {}

  public GeminiPayload(String systemPrompt, String userInput) {
    if (systemPrompt!=null && !systemPrompt.isBlank()) {
      this.systemInstruction = new SystemInstruction(systemPrompt);
    }
    this.contents = List.of(new Content(userInput));
  }

  public SystemInstruction getSystemInstruction() {return systemInstruction;}
  public void setSystemInstruction(SystemInstruction systemInstruction) {this.systemInstruction=systemInstruction;}

  public List<Content> getContents() {return contents;}
  public void setContents(List<Content> contents) {this.contents=contents;}

  //Inner Class
  public static class SystemInstruction {
    private List<Part> parts;
    public SystemInstruction(String text) {
      this.parts = List.of(new Part(text));
    }
    public List<Part> getParts() {return parts;}
    public void setParts(List<Part> parts) {this.parts=parts;}
  }

  public static class Content {
    private List<Part> parts;
    public Content(String text) {
      this.parts = List.of(new Part(text));
    }
    public List<Part> getParts() {return parts;}
    public void setParts(List<Part> parts) {this.parts=parts;}
  }

  public static class Part {
    String text;
    public Part(String text) {this.text=text;}
    public String getText() {return text;}
  }
}
