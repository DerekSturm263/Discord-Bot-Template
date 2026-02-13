import { Events, MessageFlags } from "discord.js";
import { logError } from "../miscellaneous/debug.js"

export const event = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
    
        try {
            const command = interaction.client.commands.get(interaction.commandName);
            
            await command.execute(interaction);
        } catch (error) { 
            logError(error);

            await interaction.followUp({
                content: 'An error occurred. Please report this bug [here](https://github.com/DerekSturm263/Snowbot/issues) and include what time the bot encountered the error.',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};
