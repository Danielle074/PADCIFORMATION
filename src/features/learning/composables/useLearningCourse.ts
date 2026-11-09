import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, toValue, type MaybeRef } from 'vue'
import { http } from '@/api/http'

export interface LearningProgress {
  status: 'not_started' | 'in_progress' | 'completed'
  last_position_seconds: number | null
  completed_at: string | null
}

export interface OutlineChapter {
  id: number
  key: string
  title: string
  type: 'video' | 'lesson' | 'quiz' | 'assignment'
  duration_seconds: number | null
  preview_enabled: boolean
  position: number
  locked: boolean
  progress: LearningProgress | null
}

export interface OutlineModule {
  id: number
  key: string
  title: string
  summary: string | null
  position: number
  chapters: OutlineChapter[]
}

export interface CourseOutline {
  id: number
  key: string
  slug: string
  title: string
  summary: string | null
  level: string
  status: string
  pathway?: {
    id: number
    key: string
    name: string
  } | null
  has_access: boolean
  resume?: {
    chapter_key: string
    chapter_title: string
    position_seconds: number
  } | null
  modules: OutlineModule[]
}

export interface ChapterResource {
  id: number
  key: string
  title: string
  type: string
  visibility: string
  position: number
  locked: boolean
  body: string | null
  external_url: string | null
}

export interface ChapterContent {
  id: number
  key: string
  title: string
  type: 'video' | 'lesson' | 'quiz' | 'assignment'
  body: string | null
  duration_seconds: number | null
  position: number
  resources: ChapterResource[]
}

export interface RecordProgressPayload {
  courseKey: string
  chapterKey: string
  position_seconds: number
  completed?: boolean
}

/**
 * Learner: Course outline (modules, chapters, progress, lock state).
 */
export function useCourseOutline(courseKey: MaybeRef<string | null | undefined>) {
  return useQuery({
    queryKey: computed(() => ['learning-course-outline', toValue(courseKey)]),
    enabled: computed(() => Boolean(toValue(courseKey))),
    queryFn: async () => {
      const { data } = await http.get<CourseOutline>(`/learning/courses/${toValue(courseKey)}`)
      return data
    },
  })
}

/**
 * Learner: Chapter body and unlocked resources.
 */
export function useChapterContent(
  courseKey: MaybeRef<string | null | undefined>,
  chapterKey: MaybeRef<string | null | undefined>,
) {
  return useQuery({
    queryKey: computed(() => ['learning-chapter-content', toValue(courseKey), toValue(chapterKey)]),
    enabled: computed(() => Boolean(toValue(courseKey) && toValue(chapterKey))),
    queryFn: async () => {
      const { data } = await http.get<ChapterContent>(
        `/learning/courses/${toValue(courseKey)}/chapters/${toValue(chapterKey)}`,
      )
      return data
    },
  })
}

/**
 * Learner: Record reading / video progress on a chapter.
 */
export function useRecordProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      courseKey,
      chapterKey,
      position_seconds,
      completed,
    }: RecordProgressPayload) => {
      const { data } = await http.put(
        `/learning/courses/${courseKey}/chapters/${chapterKey}/progress`,
        { position_seconds, completed },
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['learning-course-outline', variables.courseKey] })
      queryClient.invalidateQueries({
        queryKey: ['learning-chapter-content', variables.courseKey, variables.chapterKey],
      })
    },
  })
}
