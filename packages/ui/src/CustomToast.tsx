import { NativeToast as Toast } from './NativeToast'
import Constants, { ExecutionEnvironment } from 'expo-constants'
import { ReactNode } from 'react'

const isExpo =
	Constants.executionEnvironment === ExecutionEnvironment.StoreClient

export const CustomToast = (): ReactNode => {
	if (isExpo) {
		return null
	} else {
		return <Toast />
	}
}
