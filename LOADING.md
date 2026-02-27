# Loading ReplyWise Extension

## Build the Extension

```bash
npm run build
```

## Load in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** toggle in the top right
3. Click the **Load unpacked** button
4. Navigate to and select the `dist/` folder
5. ReplyWise will appear in your extensions list

## Configure API Key

1. Click the ReplyWise extension icon in Chrome's toolbar
2. Enter your OpenRouter API key (get one at https://openrouter.ai)
3. Select your preferred default tone and length
4. Click "Save Settings"

## Using ReplyWise on LinkedIn

1. Navigate to LinkedIn.com
2. Find a post you want to comment on
3. Click in any comment box
4. You'll see a spark (✦) button next to the emoji picker
5. Click the spark button to open the AI comment generator
6. Select your desired tone and length
7. Click "Generate"
8. Review the generated comment
9. Click "Insert" to add it to the comment box
10. Post the comment as usual

## Features

- **Inline Integration**: AI button appears natively in LinkedIn's comment toolbar
- **Tone Selection**: Professional, Casual, Friendly, or Thoughtful
- **Length Selection**: Short, Medium, or Long
- **Dark Mode UI**: Vercel-inspired dark theme
- **Shadow DOM**: Styles isolated from LinkedIn's CSS
- **OpenRouter API**: Supports multiple AI models
- **Daily Usage Tracking**: Monitor your AI usage

## Troubleshooting

**Button not appearing?**
- Refresh the LinkedIn page
- Check that you're on a LinkedIn URL
- Ensure the extension is enabled

**API errors?**
- Verify your OpenRouter API key is valid
- Check you have credits available at OpenRouter
- Ensure you have an internet connection

**Popup not opening?**
- Click the extension icon to check settings
- Ensure your API key is saved
- Try reloading the extension
