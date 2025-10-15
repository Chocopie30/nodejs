# Git 기본 명령어 요약 (Cheatsheet)

> 빠르게 검색하고 복습하기 좋은 Git 핵심 명령어 정리입니다.  
> 괄호 `()` 안은 선택 항목, `<>` 안은 사용자가 채우는 값입니다.

---

## 0) 최초 설정

```bash
git config --global user.name "홍길동"
git config --global user.email "you@example.com"
git config --global core.autocrlf input   # mac/linux
git config --global core.autocrlf true    # windows
git config --global init.defaultBranch main
git config --global pull.rebase false     # 기본은 merge, rebase 쓰려면 true
git config --list                         # 설정 확인
```

---

## 1) 시작하기

```bash
git init                                  # 현재 폴더에 새 저장소
git clone <repo-url> (폴더명)               # 원격 저장소 복제
```

---

## 2) 상태/차이 확인

```bash
git status                                 # 상태 확인
git diff                                   # 워킹트리 ↔ 스테이징 변경
git diff --staged                          # 스테이징 ↔ 커밋 변경
```

---

## 3) 스테이징/커밋

```bash
git add <파일>                             # 특정 파일 스테이징
git add .                                  # 변경 전부 스테이징
git restore --staged <파일>                # 스테이징 취소
git commit -m "메시지"                      # 커밋
git commit --amend                         # 직전 커밋 수정(메시지/스냅샷)
```

**좋은 커밋 메시지**: `타입: 요약 (50자 내)` → 본문은 왜/무엇을, 어떻게

---

## 4) 브랜치

```bash
git branch                                 # 로컬 브랜치 목록
git branch -r                              # 원격 브랜치 목록
git branch <브랜치>                         # 브랜치 생성
git switch <브랜치>                         # 브랜치 이동
git switch -c <브랜치>                     # 생성+이동
git branch -d <브랜치>                     # 병합된 브랜치 삭제
git branch -D <브랜치>                     # 강제 삭제
```

---

## 5) 병합 / 리베이스

```bash
git merge <브랜치>                         # 현재 브랜치에 병합
git merge --no-ff <브랜치>                 # 병합 커밋 유지
git rebase <브랜치>                        # 베이스를 옮겨 선형 히스토리
git rebase --continue / --abort            # 충돌 해결 후 진행/취소
```

> 팀 정책 확인: **공용 브랜치에서 rebase 주의**(푸시된 히스토리 변경 위험)

---

## 6) 스태시(임시 저장)

```bash
git stash push -m "작업메모"               # 변경 임시 보관
git stash list                             # 목록
git stash show -p (stash@{n})              # 내용 확인
git stash apply (stash@{n})                # 적용(목록 유지)
git stash pop (stash@{n})                  # 적용+목록 제거
```

---

## 7) 원격(Remote) / 동기화

```bash
git remote -v                              # 원격 목록
git remote add origin <url>                # 원격 추가
git fetch (origin)                         # 원격 변경 내려받기(병합 X)
git pull                                   # fetch + 병합(또는 리베이스)
git push -u origin <브랜치>                # 최초 푸시(업스트림 설정)
git push                                   # 이후 푸시
```

---

## 8) 태그(Tag) 릴리스

```bash
git tag                                    # 태그 목록
git tag v1.0.0                             # 라이트웨이트 태그
git tag -a v1.0.0 -m "릴리스"             # 주석 태그(권장)
git push origin --tags                     # 태그 푸시
```

---

## 9) 로그/검색

```bash
git log --oneline --graph --decorate --all
git log -p                                 # 패치 포함
git blame <파일>                           # 줄 단위 변경자 추적
git grep "<키워드>"                        # 코드 검색
```

---

## 10) 되돌리기(Reset/Revert/Restore/Clean)

```bash
git restore <파일>                         # 워킹트리 변경 되돌리기
git restore --source=<커밋> <파일>          # 특정 커밋 상태로 파일 복원
git reset --soft <커밋>                    # HEAD 이동(스테이징 유지)
git reset --mixed <커밋>                   # 기본, 스테이징 비움
git reset --hard <커밋>                    # 워킹트리까지 되돌림(주의!)
git revert <커밋>                          # 되돌리는 새 커밋 생성(공용 브랜치 안전)
git clean -fd                              # 추적 안 되는 파일/폴더 삭제(주의!)
```

---

## 11) .gitignore 예시

```
# 빌드 산출물
/dist
/build
/node_modules

# 환경파일
.env
*.local

# OS/IDE
.DS_Store
Thumbs.db
.vscode/
.idea/
```

---

## 12) 협업 팁(간단 워크플로)

```bash
git switch main
git pull --ff-only                 # 최신화
git switch -c feat/기능-이름       # 작업 브랜치
# 작업...
git add .
git commit -m "feat: 기능 추가"
git push -u origin feat/기능-이름  # PR 생성
```

---

## 13) 유용한 Alias

```bash
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
```

---

## 14) 충돌 해결 순서(요약)

1. `git pull` 또는 `merge/rebase` 중 **충돌 발생**
2. 에디터/툴로 충돌 파일 수정 후 저장
3. `git add <파일들>`
4. `git merge --continue` **또는** `git rebase --continue`
5. 테스트 통과 확인 후 `git push`

---

## 15) 안전수칙

- **푸시된 커밋**을 `reset --hard`로 바꾸지 않기(히스토리 파손)
- 강제 푸시(`git push -f`)는 팀 동의하에 최소화
- 정기적으로 `git fetch`로 원격 상태 동기화
- 대규모 삭제 전 `git stash`나 임시 브랜치로 백업

---

### 빠른 참고표

| 작업 | 명령 |
|---|---|
| 저장소 만들기 | `git init` |
| 복제 | `git clone <url>` |
| 상태 | `git status` |
| 변경 확인 | `git diff` / `git diff --staged` |
| 스테이징/커밋 | `git add .` → `git commit -m "msg"` |
| 브랜치 | `git switch -c <name>` |
| 병합 | `git merge <name>` |
| 리베이스 | `git rebase <base>` |
| 원격 푸시/풀 | `git push` / `git pull` |
| 태그 | `git tag -a vX.Y.Z -m "..."` |
| 되돌리기 | `git revert <commit>`(안전) / `git reset --hard <commit>`(주의) |
```
