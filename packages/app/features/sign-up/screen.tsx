import { isExpoGo } from '@oxy-space/app/utils/flags'
import { capitalizeWord } from '@oxy-space/app/utils/string'
import { signUp } from '@oxy-space/app/utils/supabase'
import { signInWithOAuth } from '@oxy-space/app/utils/supabase/auth'
import { YStack, useToastController } from '@oxy-space/ui'
import { SignUpSignInComponent } from '@oxy-space/ui/src/SignUpSignIn'
import type { Provider } from '@supabase/supabase-js'
import { ReactNode } from 'react'
import { useRouter } from 'solito/router'

export const SignUpScreen = (): ReactNode => {
	const { push } = useRouter()
	const toast = useToastController()

	const handleOAuthSignInWithPress = async (provider: Provider) => {
		const { error } = await signInWithOAuth({ provider: provider })

		if (error) {
			if (!isExpoGo) {
				toast.show(`${capitalizeWord(provider)} sign up failed`, {
					description: error.message,
				})
			}
			return
		}

		push('/')
	}

	const handleEmailSignUpWithPress = async (
		emailAddress: string,
		password: string
	) => {
		const { user, error } = await signUp(emailAddress, password)
		if (error) {
			if (!isExpoGo) {
				toast.show('Sign up failed', {
					description: error.message,
				})
			}
		} else if (user) {
			if (!isExpoGo) {
				toast.show('Email Confirmation Link', {
					description: 'Check your email for a confirmation link.',
				})
			}
			push('/')
		}
	}

	return (
		<YStack flex={1} justifyContent='center' alignItems='center' space>
			<SignUpSignInComponent
				type='sign-up'
				handleOAuthWithPress={handleOAuthSignInWithPress}
				handleEmailWithPress={handleEmailSignUpWithPress}
			/>
		</YStack>
	)
}
