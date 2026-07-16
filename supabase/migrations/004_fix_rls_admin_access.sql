-- ============================================
-- Fix RLS: Allow all operations (admin panel is protected by frontend password gate)
-- ============================================

-- site_content: drop old SELECT-only policy, add full access
DROP POLICY IF EXISTS "Site content viewable by everyone" ON site_content;
CREATE POLICY "site_content_full_access" ON site_content FOR ALL USING (true) WITH CHECK (true);

-- page_sections: replace restrictive policies with full access
DROP POLICY IF EXISTS "Page sections viewable by everyone" ON page_sections;
DROP POLICY IF EXISTS "Authenticated users can insert sections" ON page_sections;
DROP POLICY IF EXISTS "Authenticated users can update sections" ON page_sections;
DROP POLICY IF EXISTS "Authenticated users can delete sections" ON page_sections;
CREATE POLICY "page_sections_full_access" ON page_sections FOR ALL USING (true) WITH CHECK (true);

-- opportunities: keep SELECT open, add full access for writes
DROP POLICY IF EXISTS "Opportunities are viewable by everyone" ON opportunities;
DROP POLICY IF EXISTS "Authenticated users can create opportunities" ON opportunities;
DROP POLICY IF EXISTS "Creators can update their opportunities" ON opportunities;
DROP POLICY IF EXISTS "Creators can delete their opportunities" ON opportunities;
CREATE POLICY "opportunities_select" ON opportunities FOR SELECT USING (true);
CREATE POLICY "opportunities_full_access" ON opportunities FOR ALL USING (true) WITH CHECK (true);
