package com.purplerockstudios.whoami.messages;

import com.purplerockstudios.whoami.personality.PersonalityService;
import dev.langchain4j.model.input.Prompt;
import dev.langchain4j.model.input.PromptTemplate;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {

	private final ChatModel chatModel;
	private final PersonalityService personalityService;

	@Override
	public String answer(String message, List<String> conversationHistory) {
		// Ajouter la question à l'historique
		conversationHistory.add("USER: " + message);
		
		// Construire l'historique des conversations
		StringBuilder historyBuilder = new StringBuilder();
		for (String entry : conversationHistory) {
			historyBuilder.append(entry).append("\n");
		}
		
		String personality = personalityService.getPersonalityOfTheDay();
		
		String promptText = "<rules>\n" +
			"Tu es le maître du jeu \"Qui suis-je ?\". Tu dois suivre ces règles STRICTEMENT :\n" +
			"\n" +
			"1. La personnalité à faire deviner est : {{personality}}\n" +
			"2. Réponds par \"oui\", \"non\", \"yes\", or \"no\" (selon la langue tu adaptes) ou \"Je ne sais pas ou je n'ai pas envie de répondre\" (ou une traduction dans la bonne langue) si la question était une question ouverte ou \"WIN\"\n" +
			"3. Si la question contient le nom exact (et complet nom + prenom) \"{{personality}}\", réponds TOUJOURS \"WIN\"\n" +
			"4. Ne JAMAIS révéler le nom ou donner d'indices directs\n" +
			"5. Si une question ne peut pas être répondue par oui/non, réponds \"Je ne sais pas ou je n'ai pas envie de répondre\"\n" +
			"6. Garde tes réponses très courtes et fermées\n" +
			"7. IMPORTANT: Réponds TOUJOURS dans la même langue que la question posée\n" +
			"8. Si question en anglais → réponse en anglais, si en français → réponse en français\n" +
			"9. Si quelqu'un te demande la réponse explicitement comme par exemple : donne moi la réponse stp. Alors tu ne réponds pas \"WIN\" \n" +
			"</rules>\n" +
			"\n" +
			"<examples>\n" +
			"Personnalité : Emmanuel Macron\n" +
			"USER: Suis-je président ?\n" +
			"ASSISTANT: Oui\n" +
			"\n" +
			"USER: Am I a woman?\n" +
			"ASSISTANT: No\n" +
			"\n" +
			"USER: Est-ce Emmanuel Macron ?\n" +
			"ASSISTANT: WIN\n" +
			"\n" +
			"USER: Are you tall or short?\n" +
			"ASSISTANT: I cannot answer\n" +
			"</examples>\n" +
			"\n" +
			"<conversation_history>\n" +
			"{{history}}\n" +
			"</conversation_history>\n" +
			"\n" +
			"<current_question>\n" +
			"{{question}}\n" +
			"</current_question>\n" +
			"\n" +
			"Réponds maintenant à la question actuelle en suivant STRICTEMENT les règles ci-dessus.";
		
		PromptTemplate promptTemplate = PromptTemplate.from(promptText);
		
		Prompt prompt = promptTemplate.apply(
			java.util.Map.of(
				"personality", personality,
				"history", historyBuilder.toString(),
				"question", message
			)
		);
		
		String response = chatModel.getAssistant().generate(prompt.text());

		// Ajouter la réponse à l'historique
		conversationHistory.add("ASSISTANT: " + response);
		
		return response;
	}
}