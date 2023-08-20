import { isExpoGo } from '@oxy-space/app/utils/flags'
import { sendPasswordResetEmail } from '@oxy-space/app/utils/supabase/auth'
import { YStack, useToastController } from '@oxy-space/ui'
import { PasswordResetComponent } from '@oxy-space/ui/src/PasswordReset'
import { useRouter } from 'solito/router'

export const PasswordResetScreen = () => {
	const { push } = useRouter()
	const toast = useToastController()

	const handleEmailWithPress = async (email) => {
		// Send email with the password reset link
		const { error } = await sendPasswordResetEmail(email)
		if (error) {
			if (!isExpoGo) {
				toast.show('Password reset request failed', {
					description: error.message,
				})
			}
			console.log('Password reset request failed', error)
			return
		}

		push('/')
	}

	return (
		<YStack flex={1} justifyContent='center' alignItems='center' space>
			<PasswordResetComponent
				type='email'
				handleWithPress={handleEmailWithPress}
			/>
		</YStack>
	)
}
