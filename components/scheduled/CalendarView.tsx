"use client"

import { useState } from "react"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPosts } from "@/lib/mock-data"
import type { DayButton, Locale } from "react-day-picker"

const scheduledPosts = mockPosts.filter((p) => p.status === "scheduled" && p.scheduledAt)
const scheduledDates = scheduledPosts.map((p) => new Date(p.scheduledAt!))

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function PostIndicatorButton(
  props: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }
) {
  const { day, modifiers, locale, children, ...rest } = props
  const hasPost = scheduledDates.some((d) => isSameDay(d, day.date))

  return (
    <CalendarDayButton day={day} modifiers={modifiers} locale={locale} {...rest}>
      {children as React.ReactNode}
      {hasPost && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
      )}
    </CalendarDayButton>
  )
}

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const postsOnDay = selectedDate
    ? scheduledPosts.filter((p) => isSameDay(new Date(p.scheduledAt!), selectedDate))
    : []

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Calendar View</h3>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Card>
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              components={{ DayButton: PostIndicatorButton }}
            />
          </CardContent>
        </Card>

        {selectedDate && (
          <Card className="flex-1 min-w-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {postsOnDay.length === 0 ? (
                <p className="text-sm text-muted-foreground">No posts scheduled for this day.</p>
              ) : (
                <div className="space-y-3">
                  {postsOnDay.map((post) => (
                    <div key={post.id} className="space-y-1.5 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                      <p className="text-sm line-clamp-2">{post.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {post.platforms.map((p) => (
                          <Badge key={p} variant="outline" className="text-xs capitalize">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
