import { cars } from '../db/schema'
import { publicProcedure, router } from '../trpc'

export const carsRouter = router({
	all: publicProcedure.query(async ({ ctx }) => {
		const { db } = ctx
		const allCars = await db.select().from(cars).all()
		if (allCars) {
			return allCars
		}
		return null
	}),
})
