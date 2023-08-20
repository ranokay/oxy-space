import { isExpoGo } from '@oxy-space/app/utils/flags'
import { updatePassword } from '@oxy-space/app/utils/supabase/auth'
import { YStack, useToastController } from '@oxy-space/ui'
import { PasswordResetComponent } from '@oxy-space/ui/src/PasswordReset'
import { useRouter } from 'solito/router'

export const UpdatePasswordScreen = () => {
	const { push } = useRouter()
	const toast = useToastController()

	const handlePasswordWithPress = async (password) => {
		const { error } = await updatePassword(password)
		if (error) {
			if (!isExpoGo) {
				toast.show('Password change failed', {
					description: error.message,
				})
			}
			console.log('Password change failed', error)
			return
		}

		push('/')
	}

	return (
		<YStack flex={1} justifyContent='center' alignItems='center' space>
			<PasswordResetComponent
				type='password'
				handleWithPress={handlePasswordWithPress}
			/>
		</YStack>
	)
}
