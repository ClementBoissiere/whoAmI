package com.purplerockstudios.whoami.messages;

import java.util.List;

public interface ChatService {

	String answer(String message, List<String> conversationHistory);
}
