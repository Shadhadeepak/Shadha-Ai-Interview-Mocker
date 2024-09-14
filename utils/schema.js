import { date, pgTable, serial,text, varchar } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial("id").primaryKey(),
    jsonMockrResp:text('jsonMockrResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createBy:varchar('createBy').notNull(),
    createAt:varchar('createAt'),
    mockId:varchar('mockId').notNull()

}
)
export const UserAnswer=pgTable('userAnswer',{
    id:serial("id").primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    questionDb:varchar('questionDb').notNull(),
    correctAns:text('question').notNull(),
    userAns:text('userAnswer'),
    feesback:text('feesback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createAt:varchar('createAt')


}    )