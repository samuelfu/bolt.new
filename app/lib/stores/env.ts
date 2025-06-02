import { atom } from 'nanostores';
import { webcontainer } from '~/lib/webcontainer';

export const envStore = atom<string>('');

export async function setEnvVariables(envString: string) {
  envStore.set(envString);
  
  // Update .env file in webcontainer
  try {
    const container = await webcontainer;
    await container.fs.writeFile('.env', envString);
  } catch (error) {
    console.error('Failed to write .env file:', error);
  }
}

export function getEnvVariables(): string {
  return envStore.get();
} 