import { isExpoGo } from '@oxy-space/app/utils/flags'
import { capitalizeWord } from '@oxy-space/app/utils/string'
import { signIn } from '@oxy-space/app/utils/supabase'
import { signInWithOAuth } from '@oxy-space/app/utils/supabase/auth'
import { YStack, useToastController } from '@oxy-space/ui'
import { SignUpSignInComponent } from '@oxy-space/ui/src/SignUpSignIn'
import { Provider } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import { ReactNode } from 'react'
import { useRouter } from 'solito/router'

export const SignInScreen = (): ReactNode => {
	const toast = useToastController()
	const { push } = useRouter()

	const handleOAuthSignInWithPress = async (provider: Provider) => {
		const { error } = await signInWithOAuth({
			provider: provider,
			options: { scopes: 'read:user user:email' },
		})

		if (error) {
			if (!isExpoGo) {
				toast.show(`${capitalizeWord(provider)} sign in failed`, {
					description: error.message,
				})
			}
			console.log('OAuth Sign in failed', error)
			return
		}

		push('/')
	}

	const handleEmailSignInWithPress = async (
		emailAddress: string,
		password: string
	) => {
		const { error } = await signIn(emailAddress, password)

		if (error) {
			const isExpoGo = Constants.appOwnership === 'expo'
			if (!isExpoGo) {
				toast.show('Sign in failed', {
					description: error.message,
				})
			}
			return
		}

		push('/')
	}

	return (
		<YStack flex={1} justifyContent='center' alignItems='center' space>
			<SignUpSignInComponent
				type='sign-in'
				handleOAuthWithPress={handleOAuthSignInWithPress}
				handleEmailWithPress={handleEmailSignInWithPress}
			/>
		</YStack>
	)
}
