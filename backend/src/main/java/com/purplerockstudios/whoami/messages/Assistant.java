package com.purplerockstudios.whoami.messages;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.UserMessage;

public interface Assistant {

	String chat(@MemoryId int memoryId, @UserMessage String userMessage);
}
